<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Main\Sesion;

/**
 * @Route("/api")
 * @Security("is_granted('ROLE_ADMIN') or is_granted('ROLE_CONSULTA')")
 */
class ApiController extends AbstractController
{

    /**
     * @Route("/sesion", name="sesion", methods={"GET"})
     */
    public function getUltimaSesionAction(Request $request)
    {      
        $datos = $this->getSesion(false);

        return new JsonResponse($datos, 200);
    }

    
}
