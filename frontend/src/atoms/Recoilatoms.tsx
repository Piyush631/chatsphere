import { atom } from "recoil";

export const username=atom(
    {
        key:"username",
        default:" "
    }

)


export const roomname=atom(
    {
        key:"roomname",
        default:" "
    }

)


export const wssocket=atom(
    {
        key:"wssocket",
        default:null
    }

)