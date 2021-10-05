<?php

namespace App\Security\Http\Logout;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Logout\LogoutHandlerInterface;
use App\Service\LoginService;

class LogoutHandler implements LogoutHandlerInterface
{
    /**
     * Servicio de validación de usuarios
     *
     * @var LoginService
     */
    private $loginService;

    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
    }

    public function logout(Request $request, Response $response, TokenInterface $token)
    {
        $user = $token->getUser();
        /*if($user->getRoles()[0] == "ROLE_CONSULTA"){ // Si el usuario tiene rol de consulta lo doy de BAJA en usuarios recinto
            $this->loginService->bajaUsuarioRecinto($user);
        }*/
    }
}
