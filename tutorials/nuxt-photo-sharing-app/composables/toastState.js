/** 
* Toast state
*
* define function parameters with default values

* @param {string} message message to be shown
* @param {string} code status of the toast ["success", "error", "loading"]
* @param {boolean} active state of the toast 
* @param {number} time amount of time in milliseconds 
*/
export const useToastState = () => {
  return useState("toast-state", () => ({
    message: "✅ It's Quiet now...",
    code: "success",
    active: false,
    time: 8000,
  }));
};

/** 
  * function to set toast state
  *
  * define function parameters with default values

  * @param {string} message message to be shown
  * @param {string} code status of the toast ["success", "error", "loading"]
  * @param {boolean} active state of the toast 
  * @param {number} time amount of time in milliseconds 
*/
export const useSetToastState = ({
  message,
  code = "loading",
  active = true,
  time = 8000,
}) => {
  return useState("set-toast-state", () => {
    message && (useToastState().value.message = message);
    useToastState().value.code = code;
    useToastState().value.active = active;
    useToastState().value.time = time;

    console.log({ useToastState: useToastState().value });
  });
};
