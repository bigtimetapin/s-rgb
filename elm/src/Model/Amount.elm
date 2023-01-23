module Model.Amount exposing (Amount, decoder)

import Json.Decode as Decode


type alias Amount =
    { amount : Int
    , formatted : String
    }


decoder : Decode.Decoder Amount
decoder =
    Decode.map2 Amount
        (Decode.field "amount" Decode.int)
        (Decode.field "formatted" Decode.string)
