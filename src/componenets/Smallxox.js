import { useDispatch, useSelector } from "react-redux";
import Box from "./Box";
//import {ma} from "./utilities/sliceofstore/cartSlice";
//import { mark_x_or_O_in_flag } from "../../utilities/sliceofstore/cartSlice";
import { useState, useEffect } from "react";
import { mark_x_or_O_in_flag,resetgrid } from "../utilities/sliceofstore/cartSlice";
//import { resetgrid } from "./utilities/sliceofstore/cartSlice";


export const Smallxox = (props) => {
    const [isfill,setisfill]=useState(false);
    const check_if_all_boxes_fill = (mat) => {
        const arr = mat[props.indexofsmall];
        for (let i = 0; i < 9; i++) {
            if (arr[i] === 0) {
                return false;
            }
        }
        return true;
    };

    const dispatch = useDispatch();
    const [player, setPlayer] = useState({ winner: "", iswinner: false });
    const matrix = useSelector(store => store.cart.inceptionmat);
    const flagof = useSelector(state => state.cart.who_won_flag);
    const subs_index_of_xox = useSelector(store => store.cart.index_of_small_xox);
    const [winnercolor, setWinnerColor] = useState("");
    let border = "flex justify-center py-2";

    useEffect(() => {
        function check(arr1) {
            console.log(flagof);
            if (flagof[props.indexofsmall] === '') {
                const newarray = arr1[props.indexofsmall];
                const temp = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];
                for (let i = 0; i < temp.length; i++) {
                    const sum = newarray[temp[i][0]] + newarray[temp[i][1]] + newarray[temp[i][2]];
                    if (sum === 3) {
                        dispatch(mark_x_or_O_in_flag([props.indexofsmall, "X"]));
                        setWinnerColor("shadow-xl shadow-yellow-400 rounded-xl border-2");
                        setPlayer({ winner: "X", iswinner: true });
                        console.log("X is winner ");
                        break;
                    } else if (sum === 18) {
                        dispatch(mark_x_or_O_in_flag([props.indexofsmall, "O"]));
                        setWinnerColor("shadow-xl shadow-purple-700 rounded-xl border-2");
                        setPlayer({ winner: "O", iswinner: true });
                        console.log("O is winner");
                        break;
                    }
                }
                if (check_if_all_boxes_fill(arr1)) {
                    const temp = !isfill;
                    if (temp !== isfill) {
                        setisfill(temp);
                        dispatch(resetgrid(props.indexofsmall));
                    }
                }
            } else if (flagof[props.indexofsmall] !== '') {
                if (check_if_all_boxes_fill(arr1)) {
                    const temp = !isfill;
                    if (temp !== isfill) {
                        setisfill(temp);
                        dispatch(resetgrid(props.indexofsmall));
                    }
                }
            }
        }
    
        check(matrix);
    }, [matrix, flagof, dispatch, props.indexofsmall]);
    

    
    if (props.indexofsmall === subs_index_of_xox) {
        border = "flex justify-center py-2  border-2 rounded-xl border-green-500";
    }

    return (
        <div className={`${border} ${winnercolor}`}>
            <div className="grid grid-cols-3  w-44 ">
                {Array(9).fill().map((_, i) => (
                    <Box key={i} indexofbox={[props.indexofsmall, i]} fillcheck={isfill} />
                ))}
            </div>
        </div>
    );
};
