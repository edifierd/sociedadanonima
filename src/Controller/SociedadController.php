<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * @Route("/sociedad")
 */
class SociedadController extends AbstractController
{
    
    /**
     * @Route("/alta", name="sociedad_alta")
     */
    public function indexAction(Request $request)
    {
        return $this->render('sociedad/alta.html.twig');
    }

    
}
