<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Doctrine\Common\Persistence\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Container;
use App\Entity\Seguridad\Usuario;
use App\Security\User;


class LoginService {
    
    /**
    * Obtiene los 'parameters' declarados en .env
    *
    * @var ContainerBagInterface
    */
    private $params;

    /**
    * Doctrine Connection
    *
    * @var Container 
    */
    private $container;

    /**
    * Doctrine Connection
    *
    * @var EntityManagerInterface 
    */
    private $em_seg;

    /**
    * Doctrine Connection
    *
    * @var EntityManagerInterface 
    */
    private $em_exp;

    public function __construct(Container $container, ContainerBagInterface $params)
    {
        $this->params = $params;
        $this->container = $container;
        // $this->em_seg = $this->container->get('doctrine')->getManager('seguridad');
        // $this->em_exp = $this->container->get('doctrine')->getManager('default');
    }


    public function getUserByCredentials($usuario, $pass){

        //Chequeo estado del servidor, para ver si voy al primario o al secundario
        $server_LDAP = "192.168.1.33";
        $output = shell_exec("ping -n 1 -w 1 $server_LDAP");
        if (!strpos($output, "TTL=")) {
            $server_LDAP = '192.168.1.63';
        }

        //CHEQUEO DE USUARIO EN LA RED
        $usuarioRegistradoEnRedes = $this->validarLDAP($usuario, $pass, $server_LDAP);

        //CHEQUEO DE USUARIO EN LA INTRANET
        $usuarioSinEnie = str_replace("Ñ", "N", $usuario);
        $usuarioSinEnie = str_replace("ñ", "n", $usuarioSinEnie);
        $stmt = $this->em_seg->getConnection()->prepare("exec sp_usuario_validar_login_LDAP @vid_usuario = ? ");
        $stmt->bindValue(1, $usuarioSinEnie);
        $stmt->execute();
        $datosUser = $stmt->fetch();
        
        if($usuarioRegistradoEnRedes && !empty($datosUser)){
            $apps = $this->obtenerAplicacionesYopcionesDelMenu($usuarioSinEnie);
            if(!empty($apps)){
                return new User($datosUser,$apps,$datosUser);
            }
        }      
        return null;
    }

    public function altaUsuarioRecinto($usuario){
        $stmt = $this->em_exp->getConnection()->prepare("exec sp_recinto_usuarios @accion = ?, @id_usuario = ?, @estado = ? ");
        $stmt->bindValue(1, "A");
        $stmt->bindValue(2, $usuario->getUsername());
        $stmt->bindValue(3, 0);
        $stmt->execute();
        $rta = $stmt->fetch();
        return $rta;
    }

    public function bajaUsuarioRecinto($usuario){
        $stmt = $this->em_exp->getConnection()->prepare("exec sp_recinto_usuarios @accion = ?, @id_usuario = ?, @estado = ? ");
        $stmt->bindValue(1, "B");
        $stmt->bindValue(2, $usuario->getUsername());
        $stmt->bindValue(3, 0);
        $stmt->execute();
        $rta = $stmt->fetch();
        return $rta;
    }

    public function getUser($username){
        $stmt = $this->em_exp->getConnection()->prepare("exec sp_recinto_usuarios @accion = ?, @id_usuario = ?, @estado = ? ");
        $stmt->bindValue(1, "C");
        $stmt->bindValue(2, $username);
        $stmt->bindValue(3, 0);
        $stmt->execute();
        $rta = $stmt->fetch();
        return $rta;
    }

    public function checkUpdate($username){
        $user = $this->getUser($username);

        if($user['estado'] == 1){
            $stmt = $this->em_exp->getConnection()->prepare("exec sp_recinto_usuarios @accion = ?, @id_usuario = ?, @estado = ? ");
            $stmt->bindValue(1, "R");
            $stmt->bindValue(2, $usuario->getUsername());
            $stmt->bindValue(3, 0);
            $stmt->execute();
            $user = $stmt->fetch();

            return true;
        }
        return false;
    }

    private function validarLDAP($usuario_LDAP, $contrasena_LDAP, $servidor_LDAP = "192.168.1.33") {
        error_reporting(0);

        $servidor_dominio = "HCDIPUTADOS-BA.GOV.AR";
        $ldap_dn = "dc=HCDIPUTADOS-BA,dc=com";

        $conectado_LDAP = ldap_connect($servidor_LDAP);
        ldap_set_option($conectado_LDAP, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($conectado_LDAP, LDAP_OPT_REFERRALS, 0);
        
        if ($conectado_LDAP) {
                      
            $autenticado_LDAP = ldap_bind($conectado_LDAP, $usuario_LDAP . "@" . $servidor_dominio, $contrasena_LDAP);

            if ($autenticado_LDAP) {
                return true; //usuario registrado en redes
            } else {
                return false; //usuario NO  registrado en redes
            }

        } else {
            return false;
        }
    }

    private function obtenerAplicacionesYopcionesDelMenu($usuarioSinEnie){
        $stmt = $this->em_seg->getConnection()->prepare("exec sp_usuario_accesos_INTRA @vid_usuario = ? , @vfiltro_habilitada = 1, @mi_portal = 'S' ");
        $stmt->bindValue(1, $usuarioSinEnie);
        $stmt->execute();

        $apps = $stmt->fetchAll();
        
        foreach ($apps as &$app) {
            if(trim($app['id_app']) == "RECINTO"){
                $stmt = $this->em_seg->getConnection()->prepare("exec sp_usuario_opciones_INTRA_activas @vid_usuario = ? , @vid_app = ? , @vfiltro_habilitada = 1 ");
                $stmt->bindValue(1, $usuarioSinEnie);
                $stmt->bindValue(2, $app['id_app']);
                $stmt->execute();
    
                return $stmt->fetchAll();
            }
        }
        return null;
    }
}
