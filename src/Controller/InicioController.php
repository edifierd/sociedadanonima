<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Cookie\SessionCookieJar;
use GuzzleHttp\Exception\RequestException;


class InicioController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }
    
    /**
     * @Route("/", name="index")
     */
    public function indexAction(Request $request)
    {
        return $this->redirectToRoute("home");
    }

    /**
     * @Route("/inicio", name="home")
     */
    public function homeAction(Request $request)
    {
        return $this->render('inicio/home.html.twig');
    }

    /**
     * @Route("/bonita", name="bonita")
     */
    public function bonitaAction(Request $request)
    {
        try {
            $jar = new SessionCookieJar('MiCookie',true);

            $client = new Client([
                'base_uri' => 'http://localhost:8080',
                'cookies' => $jar
            ]);

            // LOGIN
            $client->request('POST', 'bonita/loginservice', ['form_params' => [
                'username' => 'apoderado',
                'password' => 'bpm',
                'redirect' => 'false'
            ]]);
            // $token = $jar->getCookieByName('X-Bonita-API-Token')->getValue();

            // GET PROCESS BY NAME
            $process = $client->request('GET', 'bonita/api/bpm/process', [
                'query' => [    
                    'name' => 'Direccion Nacional de Personas Juridicas',
                ],
                'cookies' => $jar
            ]);
            $process = json_decode((string) $process->getBody());
            $processId = $process[0]->id;
            dump($process);

            // FIND A CASE
            $case = $client->request('GET', 'bonita/api/bpm/case', [
                'query' => [
                    'processDefinitionId' => $processId,
                ],
                'cookies' => $jar
            ]);
            $case = json_decode((string) $case->getBody());
            if(empty($case)){
                // CREATE A CASE
                $case = $client->request('POST', 'bonita/api/bpm/case', [
                    'json' => [
                        'processDefinitionId' => $processId,
                    ],
                    'cookies' => $jar
                ]);
                $case = json_decode((string) $case->getBody());
            } 
            $caseId = $case[0]->id;
            dump($case);

            // USUARIOS
            // $user = $client->request('GET', 'bonita/api/bpm/actor?f=process_id='.$processId);
            // $user = $client->request('GET', 'bonita/api/bpm/actor/205');
            // $user = $client->request('GET', 'bonita/api/bpm/actorMember');
            // $user = $client->request('GET', 'bonita/api/identity/user?d=manager_id=109');
            // dd(json_decode((string) $user->getBody()));

            // Actividad
            $activity = $client->request('GET', 'bonita/api/bpm/activity?p=0&c=10&f=caseId%3d'.$caseId);
            $activity = json_decode((string) $activity->getBody());
            $taskId =  $activity[0]->id;
            dump($activity);

            // UPDATE ACTIVIDAD
            // 'state' => ready, completed, failed, replay, skipped, replay
            $userTask = $client->request('PUT', 'bonita/api/bpm/userTask/'.$taskId,[
                'json' => [
                    'assigned_id' => 2
                ]
            ]);
            dump(json_decode((string) $userTask->getBody()));

            // UPDATE CASE VARIABLE
            $client->request('PUT', 'bonita/api/bpm/caseVariable/'.$caseId.'/esCorrecto', [
                'json' => [
                    'type' => 'java.lang.Boolean',
                    'value' => true,
                ],
                'cookies' => $jar
            ]);
            dd("aca");

            // FINALIZAR TAREA
            // $userTask = $client->request('POST', 'bonita/api/bpm/userTask/'.$taskId.'/execution?assign=true',[
            //     'json' => [
            //         'ticket_comment' => "Un comentario por aca"
            //     ]
            // ]);
            // dd(json_decode((string) $userTask->getBody()));
            
            // $activity = $client->request('GET', 'bonita/api/bpm/activity?p=0&c=10&f=caseId%3d'.$caseId);
            // $activity = json_decode((string) $activity->getBody());
            // dump($activity);


            // // GET CASE VARIABLE
            // $caseVariable = $client->request('GET', 'bonita/api/bpm/caseVariable/'.$caseId.'/nombreSociedad');
            // $caseVariable = json_decode((string) $caseVariable->getBody());
            // dd($caseVariable);
        } catch (RequestException $e) {
            echo Psr7\Message::toString($e->getRequest());
            if ($e->hasResponse()) {
                echo Psr7\Message::toString($e->getResponse());
            }
        }
        dd("fin");

        

    }   
    
    /**
     * @Route("/currentUser", name="current_user")
     */
    public function currentUserAction()
    {
        $user = $this->getUser();
        return $this->json($user);
    }
}
