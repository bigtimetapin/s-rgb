module Model.Model exposing (Model, init, waiting)

import Browser.Navigation as Nav
import Model.State.Exception.Exception as Exception
import Model.State.Global.Global as Global
import Model.State.Local.Local as Local exposing (Local)
import Model.State.State exposing (State)
import Model.User.State as UserState
import Msg.Msg exposing (Msg(..))
import Msg.User.Msg as UserMsg
import Sub.Sender.Ports exposing (sender)
import Sub.Sender.Sender as Sender
import Url


type alias Model =
    { state : State
    , url : Url.Url
    , key : Nav.Key
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url key =
    let
        local : Local
        local =
            Local.parse url

        model : Model
        model =
            { state =
                { local = local
                , global = Global.default
                , exception = Exception.Closed
                }
            , url = url
            , key = key
            }
    in
    case local of
        Local.User UserState.Top ->
            ( waiting model
            , sender <|
                Sender.encode0 <|
                    Sender.User <|
                        UserMsg.Fetch
            )

        _ ->
            ( model
            , Cmd.none
            )


waiting : Model -> Model
waiting model =
    let
        state =
            model.state

        waiting_ =
            { state | exception = Exception.Waiting }
    in
    { model | state = waiting_ }
