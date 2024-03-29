module Msg.User.Msg exposing (Msg(..), toString)

import Model.Cell exposing (Cell)
import Model.Color exposing (Color)
import Model.Grid exposing (Grid)
import Model.Pixel as Pixel
import Model.Primary exposing (Primary(..))
import Model.User.State.Paint as Paint
import Model.User.User exposing (User)


type Msg
    = Fetch
      -- href
    | HrefStake User
    | HrefCraft User
    | HrefVault User
    | HrefPaint User
      -- stake
    | Stake Primary
    | Harvest Primary
      -- craft
    | MintPixel Pixel.Seeds
    | MergePixel Pixel.Seeds
    | AddPixel Pixel.Seeds Pixel.Seeds
    | SeparatePixel Pixel.Seeds Pixel.Seeds
      -- paint
    | Paint Grid
      -- paint ui
    | SizeGridX User Paint.Sizing String
    | SizeGridY User Paint.Sizing String
    | CommitGrid User Paint.Sizing
    | SizeCell User Grid Color String
    | ChangeColor User Grid Color
    | OpenBuffer User Grid Color Cell
    | ColorPixel User Grid Color Cell
    | CloseBuffer User Grid Color
    | ClearGrid User Grid Color


toString : Msg -> String
toString msg =
    case msg of
        Fetch ->
            "user-fetch"

        Stake Red ->
            "user-stake-red"

        Stake Green ->
            "user-stake-green"

        Stake Blue ->
            "user-stake-blue"

        Harvest Red ->
            "user-harvest-red"

        Harvest Green ->
            "user-harvest-green"

        Harvest Blue ->
            "user-harvest-blue"

        MintPixel _ ->
            "user-mint-pixel"

        MergePixel _ ->
            "user-merge-pixel"

        AddPixel _ _ ->
            "user-add-pixel"

        SeparatePixel _ _ ->
            "user-separate-pixel"

        Paint _ ->
            "user-paint"

        _ ->
            "no-op"
