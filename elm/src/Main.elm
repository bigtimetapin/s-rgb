module Main exposing (main)

-- MAIN

import Browser
import Browser.Navigation as Nav
import Model.Color as Color
import Model.Grid as Grid
import Model.Model as Model exposing (Model)
import Model.Pixel as Pixel
import Model.State.Exception.Exception as Exception
import Model.State.Global.Global as Global
import Model.State.Local.Local as Local exposing (Local)
import Model.User.State.Paint as Paint
import Model.User.State.State as UserState
import Model.User.User as User
import Msg.Admin.Msg as AdminMsg
import Msg.Js as JsMsg
import Msg.Msg exposing (Msg(..), resetViewport)
import Msg.User.Msg as UserMsg
import Sub.Listener.Global.Global as ToGlobal
import Sub.Listener.Listener as Listener
import Sub.Listener.Local.Local as ToLocal
import Sub.Listener.Local.User.Listener as UserListener
import Sub.Sender.Ports exposing (sender)
import Sub.Sender.Sender as Sender
import Sub.Sub as Sub
import Url
import View.Admin.View
import View.Error.Error
import View.Hero
import View.User.View


main : Program () Model Msg
main =
    Browser.application
        { init = Model.init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.subs
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        UrlChanged url ->
            let
                local : Local
                local =
                    Local.parse url

                bump : Model
                bump =
                    { model
                        | state =
                            { local = local
                            , global = model.state.global
                            , exception = model.state.exception
                            }
                        , url = url
                    }
            in
            ( bump
            , resetViewport
            )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        FromAdmin fromAdminMsg ->
            case fromAdminMsg of
                AdminMsg.Init ->
                    ( model
                    , sender <|
                        Sender.encode0 <|
                            Sender.Admin <|
                                fromAdminMsg
                    )

        FromUser fromUserMsg ->
            case fromUserMsg of
                UserMsg.Fetch ->
                    ( Model.waiting model
                    , sender <|
                        Sender.encode0 <|
                            Sender.User <|
                                fromUserMsg
                    )

                UserMsg.HrefStake user ->
                    ( { model
                        | state =
                            { local = Local.User <| UserState.Stake user
                            , global = model.state.global
                            , exception = model.state.exception
                            }
                      }
                    , Cmd.none
                    )

                UserMsg.HrefMix user ->
                    ( { model
                        | state =
                            { local = Local.User <| UserState.Mix user
                            , global = model.state.global
                            , exception = model.state.exception
                            }
                      }
                    , Cmd.none
                    )

                UserMsg.HrefVault user ->
                    ( { model
                        | state =
                            { local = Local.User <| UserState.Vault user
                            , global = model.state.global
                            , exception = model.state.exception
                            }
                      }
                    , Cmd.none
                    )

                UserMsg.HrefPaint user ->
                    ( { model
                        | state =
                            { local = Local.User <| UserState.Paint
                                (Paint.SizingGrid
                                    { x = 24, y = 24 }
                                )
                                user
                            , global = model.state.global
                            , exception = model.state.exception
                            }
                      }
                    , Cmd.none
                    )

                UserMsg.Stake _ ->
                    ( Model.waiting model
                    , sender <|
                        Sender.encode0 <|
                            Sender.User <|
                                fromUserMsg
                    )

                UserMsg.Harvest _ ->
                    ( Model.waiting model
                    , sender <|
                        Sender.encode0 <|
                            Sender.User <|
                                fromUserMsg
                    )

                UserMsg.MintPixel seeds ->
                    ( Model.waiting model
                    , sender <|
                        Sender.encode
                            { sender = Sender.User fromUserMsg
                            , more = Pixel.encode seeds
                            }
                    )

                UserMsg.MergePixel seeds ->
                    ( Model.waiting model
                    , sender <|
                        Sender.encode
                            { sender = Sender.User fromUserMsg
                            , more = Pixel.encode seeds
                            }
                    )

                UserMsg.AddPixel left right ->
                    ( Model.waiting model
                    , sender <|
                        Sender.encode
                            { sender = Sender.User fromUserMsg
                            , more = Pixel.encodeTwo left right
                            }
                    )

                UserMsg.SeparatePixel left right ->
                    ( Model.waiting model
                    , sender <|
                        Sender.encode
                            { sender = Sender.User fromUserMsg
                            , more = Pixel.encodeTwo left right
                            }
                    )

                UserMsg.Paint grid ->
                    ( Model.waiting model
                    , sender <|
                        Sender.encode <|
                            { sender = Sender.User fromUserMsg
                            , more = Grid.encode <| Grid.reduce grid
                            }
                    )

                UserMsg.SizeGridX user sizing string ->
                    let
                        x =
                            case String.toInt string of
                                Just int ->
                                    int

                                Nothing ->
                                    sizing.x

                    in
                    ( { model
                        | state =
                            { local = Local.User <| UserState.Paint
                                (Paint.SizingGrid
                                    { sizing | x = x }
                                )
                                user
                            , global = model.state.global
                            , exception = model.state.exception
                            }
                    }
                    , Cmd.none
                    )


                UserMsg.SizeGridY user sizing string ->
                    let
                        y =
                            case String.toInt string of
                                Just int ->
                                    int

                                Nothing ->
                                    sizing.x

                    in
                    ( { model
                        | state =
                            { local = Local.User <| UserState.Paint
                                (Paint.SizingGrid
                                    { sizing | y = y }
                                )
                                user
                            , global = model.state.global
                            , exception = model.state.exception
                            }
                    }
                    , Cmd.none
                    )

                UserMsg.CommitGrid user sizing ->
                    ( { model
                        | state =
                            { local = Local.User <| UserState.Paint
                                (Paint.HasGrid
                                    (Grid.resize sizing.x sizing.y)
                                    Color.init
                                )
                                user
                            , global = model.state.global
                            , exception = model.state.exception
                            }
                    }
                    , Cmd.none
                    )

                UserMsg.ChangeColor user grid color ->
                    ( { model
                        | state =
                            { local = Local.User <| UserState.Paint
                                (Paint.HasGrid
                                    grid color
                                )
                                user
                            , global = model.state.global
                            , exception = model.state.exception
                            }
                      }
                    , Cmd.none
                    )

                UserMsg.ColorPixel user grid color cell ->
                    let
                        rows =
                            List.map
                                (\row ->
                                    List.map
                                        (\cell_ ->
                                            case cell.index == cell_.index of
                                                True ->
                                                    { cell_ | color = color }

                                                False ->
                                                    cell_
                                        )
                                        row
                                )
                                grid
                    in
                    ( { model
                        | state =
                            { local =
                                Local.User <|
                                    UserState.Paint
                                        (Paint.HasGrid
                                        rows
                                        color
                                        )
                                        user
                            , global = model.state.global
                            , exception = model.state.exception
                            }
                      }
                    , Cmd.none
                    )


        FromJs fromJsMsg ->
            case fromJsMsg of
                -- JS sending success for decoding
                JsMsg.Success json ->
                    -- decode
                    case Listener.decode0 json of
                        -- decode success
                        Ok maybeListener ->
                            -- look for role
                            case maybeListener of
                                -- found role
                                Just listener ->
                                    -- which role?
                                    case listener of
                                        -- found msg for local update
                                        Listener.Local toLocal ->
                                            case toLocal of
                                                ToLocal.User userListener ->
                                                    case userListener of
                                                        UserListener.Fetched ->
                                                            let
                                                                f user =
                                                                    let
                                                                        local =
                                                                            case model.state.local of
                                                                                Local.User (UserState.Stake _) ->
                                                                                    Local.User <| UserState.Stake user

                                                                                Local.User (UserState.Mix _) ->
                                                                                    Local.User <| UserState.Mix user

                                                                                Local.User (UserState.Vault _) ->
                                                                                    Local.User <| UserState.Vault user

                                                                                Local.User (UserState.Paint _ _) ->
                                                                                    Local.User <|
                                                                                        UserState.Paint
                                                                                            (Paint.HasGrid
                                                                                            Grid.init
                                                                                            Color.init
                                                                                            )
                                                                                            user

                                                                                _ ->
                                                                                    Local.User <| UserState.Stake user
                                                                    in
                                                                    { model
                                                                        | state =
                                                                            { local = local
                                                                            , global = model.state.global
                                                                            , exception = Exception.Closed
                                                                            }
                                                                    }
                                                            in
                                                            Listener.decode model json User.decode f

                                        -- found msg for global
                                        Listener.Global toGlobal ->
                                            case toGlobal of
                                                ToGlobal.FoundWalletDisconnected ->
                                                    ( { model
                                                        | state =
                                                            { local =
                                                                Local.User <|
                                                                    UserState.Top
                                                            , global = Global.NoWalletYet
                                                            , exception = Exception.Closed
                                                            }
                                                      }
                                                    , Cmd.none
                                                    )

                                                ToGlobal.FoundMissingWalletPlugin ->
                                                    ( { model
                                                        | state =
                                                            { local = model.state.local
                                                            , global = Global.WalletMissing
                                                            , exception = Exception.Closed
                                                            }
                                                      }
                                                    , Cmd.none
                                                    )

                                                ToGlobal.FoundUser ->
                                                    let
                                                        f user =
                                                            case model.state.local of
                                                                Local.User _ ->
                                                                    { model
                                                                        | state =
                                                                            { local =
                                                                                Local.User <|
                                                                                    UserState.Stake user
                                                                            , global = Global.HasUser user
                                                                            , exception = Exception.Closed
                                                                            }
                                                                    }

                                                                _ ->
                                                                    { model
                                                                        | state =
                                                                            { local = model.state.local
                                                                            , global = Global.HasUser user
                                                                            , exception = Exception.Closed
                                                                            }
                                                                    }
                                                    in
                                                    Listener.decode model json User.decode f

                                -- undefined role
                                Nothing ->
                                    let
                                        message =
                                            String.join
                                                " "
                                                [ "Invalid role sent from client:"
                                                , json
                                                ]
                                    in
                                    ( { model
                                        | state =
                                            { local = Local.Error message
                                            , global = model.state.global
                                            , exception = model.state.exception
                                            }
                                      }
                                    , Cmd.none
                                    )

                        -- error from decoder
                        Err string ->
                            ( { model
                                | state =
                                    { local = Local.Error string
                                    , global = model.state.global
                                    , exception = model.state.exception
                                    }
                              }
                            , Cmd.none
                            )

                -- JS sending exception to catch
                JsMsg.Exception string ->
                    case Exception.decode string of
                        Ok exception ->
                            ( { model
                                | state =
                                    { local = model.state.local
                                    , global = model.state.global
                                    , exception = Exception.Open exception.message exception.href
                                    }
                              }
                            , Cmd.none
                            )

                        Err jsonError ->
                            ( { model
                                | state =
                                    { local = Local.Error jsonError
                                    , global = model.state.global
                                    , exception = model.state.exception
                                    }
                              }
                            , Cmd.none
                            )

        Global fromGlobal ->
            ( Model.waiting model
            , sender <| Sender.encode0 <| Sender.Global fromGlobal
            )

        CloseExceptionModal ->
            ( { model
                | state =
                    { local = model.state.local
                    , global = model.state.global
                    , exception = Exception.Closed
                    }
              }
            , Cmd.none
            )



-- VIEW


view : Model -> Browser.Document Msg
view model =
    let
        hero =
            View.Hero.view model.state.exception model.state.global

        html =
            case model.state.local of
                Local.Admin admin ->
                    hero <| View.Admin.View.view admin

                Local.User user ->
                    hero <| View.User.View.view user

                Local.Error error ->
                    hero <| View.Error.Error.body error
    in
    { title = "s-rgb"
    , body =
        [ html
        ]
    }
