module Model.Primary exposing (Primary(..), text, toColor, toString, toSymbol)

import Model.Color as Color exposing (Color)


type Primary
    = Red
    | Green
    | Blue


toSymbol : Primary -> String
toSymbol primary =
    case primary of
        Red ->
            "$R"

        Green ->
            "$G"

        Blue ->
            "$B"


toString : Primary -> String
toString primary =
    case primary of
        Red ->
            "red"

        Green ->
            "green"

        Blue ->
            "blue"


text : Primary -> String
text primary =
    case primary of
        Red ->
            "has-red-text"

        Green ->
            "has-green-text"

        Blue ->
            "has-blue-text"


toColor : Primary -> Color
toColor primary =
    case primary of
        Red ->
            Color.Red

        Green ->
            Color.Green

        Blue ->
            Color.Blue
