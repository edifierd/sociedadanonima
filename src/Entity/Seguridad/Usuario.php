<?php

namespace App\Entity\Seguridad;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Query\ResultSetMapping;

/**
 *
 * @ORM\Entity
 */
class Usuario
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_usuario", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id_usuario;

    public static function getMapping() {
        $rsm = new ResultSetMapping();
        $rsm->addEntityResult(Usuario::class, 's');
        $rsm->addFieldResult('s', 'id_usuario', 'id_usuario');
        return $rsm;    
    }
}
