<?php

namespace App\Security;

use Symfony\Component\Security\Core\User\UserInterface;

class User implements UserInterface
{
    private $datosUser;

    private $id;

    private $roles = [];

    private $info = [];

    public function __construct($datosUser, $apps, $info)
    {
        $this->datosUser = $datosUser;
        $this->id = trim($this->datosUser['id_usuario']);
        $this->info = $info;
        foreach ($apps as &$app){
            $this->roles[] = [
                "cod" => "ROLE_".strtoupper($app['url']),
                "descrip" => trim($app['d_opcion'])
            ];
        }
    }

    /**
     * @var string The hashed password
     */
    private $password;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->id;
    }

    /**
     * Nombre y Apellido.
     *
     * @see UserInterface
     */
    public function getNombreCompleto(): string
    {
        return (string) trim($this->datosUser['nombres'])." ".trim($this->datosUser['apellido']);
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = [];
        foreach ($this->roles as &$rol){
            $roles[] = $rol["cod"];
        }

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRolesDescrip(): array
    {
        return $this->roles;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    // "id_usuario" => "FTUBARO             "
    // "apellido" => "TUBARO                        "
    // "nombres" => "FEDERICO                      "
    // "c_dependen" => "0102010006010100"
    // "d_dependen" => "DESARROLLO                                                                      "
    // "administrador" => 1
    // "telefono" => ""
    // "email" => "FTUBARO@HCDIPUTADOS-BA.GOV.AR"
    // "doc" => "100000907"
    // "extranet" => 1
    // "mensajes" => 0
    // "c_dependen_N" => "0102010006010100"
    // "d_dependen_N" => "DESARROLLO                                                                      "
    // "c_cargo" => null
    // "grupo_usu" => "001"
    // "c_condrev" => null
    // "grupo" => "Grupo Desarrollo"
}
