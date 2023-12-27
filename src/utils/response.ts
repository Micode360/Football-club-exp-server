export const response = (success:boolean, status:number, message:string) => {
    return {
      success,
      status,
      message
    }
}