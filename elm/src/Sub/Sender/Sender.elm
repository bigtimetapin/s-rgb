module Sub.Sender.Sender exposing (Sender(..), WithMore, encode, encode0)

import Json.Encode as Encode
import Msg.Admin.Msg as Admin
import Msg.Global as FromGlobal
import Msg.User.Msg as User


type Sender
    = Admin Admin.Msg
    | User User.Msg
    | Global FromGlobal.Global


type alias WithMore =
    { sender : Sender
    , more : Json
    }


encode : WithMore -> Json
encode withMore =
    let
        encoder =
            Encode.object
                [ ( "sender", Encode.string <| toString withMore.sender )
                , ( "more", Encode.string withMore.more )
                ]
    in
    Encode.encode 0 encoder


encode0 : Sender -> Json
encode0 role =
    let
        encoder =
            Encode.object
                [ ( "sender", Encode.string <| toString role )
                ]
    in
    Encode.encode 0 encoder


toString : Sender -> String
toString role =
    case role of
        Admin fromAdmin ->
            Admin.toString fromAdmin

        User fromUser ->
            User.toString fromUser

        Global fromGlobal ->
            FromGlobal.toString fromGlobal


type alias Json =
    String
