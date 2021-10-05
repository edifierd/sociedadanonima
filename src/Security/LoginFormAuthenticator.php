<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\Authenticator\AbstractFormLoginAuthenticator;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use App\Service\LoginService;

class LoginFormAuthenticator extends AbstractFormLoginAuthenticator 
{
    use TargetPathTrait;

    public const LOGIN_ROUTE = 'app_login';

    private $urlGenerator;

    /**
     * Servicio de validación de usuarios
     *
     * @var LoginService
     */
    private $loginService;

    public function __construct(UrlGeneratorInterface $urlGenerator, LoginService $loginService)
    {
        $this->urlGenerator = $urlGenerator;
        $this->loginService = $loginService;
    }

    public function supports(Request $request)
    {
        return self::LOGIN_ROUTE === $request->attributes->get('_route')
            && $request->isMethod('POST');
    }

    public function getCredentials(Request $request)
    {
        $credentials = [
            'id' => $request->request->get('id'),
            'password' => $request->request->get('password'),
            'csrf_token' => $request->request->get('_csrf_token'),
        ];
        $request->getSession()->set(
            Security::LAST_USERNAME,
            $credentials['id']
        );

        return $credentials;
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $user = null;
        // if($credentials['password'] == "pipo"){
        //     $user = new User ($credentials['id']);
        // }

        // Load / create our user however you need.
        // You can do this by calling the user provider, or with custom logic here.
        // $user = $userProvider->loadUserByUsername($credentials['id']);
        $user = $this->loginService->getUserByCredentials($credentials['id'],$credentials['password']);
        
        if (!$user) {
            // fail authentication with a custom error
            throw new CustomUserMessageAuthenticationException('Usuario no válido o no cuenta con permisos para acceder.');
        }

        // if($user->getRoles()[0] == "ROLE_CONSULTA"){ // Si el usuario tiene rol de consulta lo doy de ALTA en usuarios recinto
        //     $this->loginService->altaUsuarioRecinto($user);
        // }

        return $user;
    }

    public function checkCredentials($credentials, UserInterface $user)
    {      
        return true;
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function getPassword($credentials): ?string
    {
        return $credentials['password'];
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        if ($targetPath = $this->getTargetPath($request->getSession(), $providerKey)) {
            return new RedirectResponse($targetPath);
        }

        // For example : return new RedirectResponse($this->urlGenerator->generate('some_route'));
        return new RedirectResponse($this->urlGenerator->generate('index'));
    }

    protected function getLoginUrl()
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
}
