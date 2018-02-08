<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use App\Message;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function chat(){

        $messages= Message::all();
        return view('chat', compact('messages'));

    }

    public function send(request $request){

        // add to DB
        Message::create(['message' => $request->message, 'user_id' => Auth::user()->id]);
        $user = User::find(Auth::id());

        event(new ChatEvent($request->message,$user));
    }



}
