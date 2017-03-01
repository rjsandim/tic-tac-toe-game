<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class SelectYourOpponentController extends CI_Controller
{

    public function handle() {

        $this->load->view('modules/board/select_opponent');
    }

}