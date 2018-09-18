open Tea.App

open Tea.Html

(* Model *)

type player = {
    name: string;
    chutzpah: int;
}

type tile = {
    id: string;
    name: string;
}

type model = {
    player: player;
    tile: tile;
}

let defaultModel = {
    player = { name = "Ben"; chutzpah = 0 };
    tile = { id = "0"; name = "Ship" }
}

(* Update *)

let incrementChutzpah player =
    {player with chutzpah = player.chutzpah + 1}

let decrementChutzpah player =
    {player with chutzpah = player.chutzpah - 1}

let setChutzpah player amt =
    {player with chutzpah = amt}

type msg =
  | Increment
  | Decrement 
  | Reset 
  | Set of int 
  [@@bs.deriving {accessors}] 

let init () = (defaultModel, Tea.Cmd.None)


let update model = function 
  | Increment -> incrementChutzpah model.player
  | Decrement -> decrementChutzpah model.player
  | Reset -> setChutzpah model.player 0
  | Set v -> setChutzpah model.player v


let view_button title msg =
  button
    [ onClick msg
    ]
    [ text title
    ]

let view_player player =
    div
        []
        [ h1 [] [text player.name] 
        ; h2 [] [text player.chutzpah]
        ]

let view model =
  div
    []
    [ span
        [ style "text-weight" "bold" ]
        [ view_player model.player ]
    ; br []
    ; view_button "Increment" Increment
    ; br []
    ; view_button "Decrement" Decrement
    ; br []
    ; view_button "Set to 42" (Set 42)
    ; br []
    ; if model <> 0 then view_button "Reset" Reset else noNode
    ]


let main =
  standardProgram { 
    init;
    update;
    view;
    subscriptions = fun _ -> Tea.Sub.none;
  }