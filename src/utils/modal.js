import Swal from "sweetalert2";
import { setName } from "../containers/App/slices/userSlice";
import { setNewGame } from "../containers/App/slices/gameSlice";

const createNewGame = ({
  dispatch,
  createGameBoard,
  setFlippedCards,
  setIsDisabled,
}) => {
  setFlippedCards([]);
  setIsDisabled(false);
  dispatch(setNewGame());
  createGameBoard();
};

const Modal = {
  gameOverModal: async ({
    user,
    hits,
    misses,
    createGameBoard,
    setFlippedCards,
    setIsDisabled,
    dispatch,
  }) => {
    await Swal.fire({
      title: `Hey, ${user}!`,
      text: `You finished the game with ${hits} hits and ${misses} misses 🥳`,
      width: `${window.innerWidth < 768 ? "80%" : ""}`,
      padding: "1em",
      color: "#211A1D",
      background: "#F8F0FB",
      backdrop: `
          rgba(33, 26, 29, 0.8)
        `,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showDenyButton: true,
      confirmButtonText: "Play again",
      denyButtonText: "New player",
      confirmButtonColor: "#8075FF",
    }).then(async ({ isConfirmed, isDenied }) => {
      if (isConfirmed) {
        createNewGame({
          dispatch,
          createGameBoard,
          setFlippedCards,
          setIsDisabled,
        });
      } else if (isDenied) {
        await Modal.usernameRequestModal({ dispatch });
        createNewGame({
          dispatch,
          createGameBoard,
          setFlippedCards,
          setIsDisabled,
        });
      }
    });
  },
  usernameRequestModal: async ({ dispatch }) => {
    await Swal.fire({
      title: "👋🏽 Hey! What's your name?",
      input: "text",
      inputPlaceholder: "Enter your name...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputAttributes: {
        maxlength: 20,
      },
      inputValidator: (value) => {
        if (!value) {
          return "😓 You need to write something!";
        }
      },
    }).then(({ value }) => dispatch(setName(value)));
  },
};

export default Modal;
