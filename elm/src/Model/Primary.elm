module Model.Primary exposing (Primary(..), toSymbol)


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
