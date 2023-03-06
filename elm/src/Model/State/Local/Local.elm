module Model.State.Local.Local exposing (..)

import Html
import Html.Attributes
import Model.Admin.State as Admin
import Model.Color as Color
import Model.Grid as Grid
import Model.User.State as User
import Url
import Url.Parser as UrlParser exposing ((</>))


type Local
    = Error String
    | Admin Admin.State
    | User User.State


urlParser : UrlParser.Parser (Local -> c) c
urlParser =
    UrlParser.oneOf
        [ -- top
          UrlParser.map
            (User <| User.Top)
            UrlParser.top

        -- admin
        , UrlParser.map
            (Admin <| Admin.Top)
            (UrlParser.s "admin")

        -- user
        , UrlParser.map
            (User <| User.Top)
            (UrlParser.s "user")
        , UrlParser.map
            (User <| User.Paint Grid.init Color.White)
            (UrlParser.s "user" </> UrlParser.s "paint")
        ]


parse : Url.Url -> Local
parse url =
    let
        target =
            -- The RealWorld spec treats the fragment like a path.
            -- This makes it *literally* the path, so we can proceed
            -- with parsing as if it had been a normal path all along.
            { url | path = Maybe.withDefault "" url.fragment, fragment = Nothing }
    in
    case UrlParser.parse urlParser target of
        Just state ->
            state

        Nothing ->
            Error "404; Invalid Path"


path : Local -> String
path local =
    case local of
        Admin Admin.Top ->
            "#/admin"

        User User.Top ->
            "#/user"

        _ ->
            -- routes to error
            "#/invalid"


href : Local -> Html.Attribute msg
href local =
    Html.Attributes.href (path local)
