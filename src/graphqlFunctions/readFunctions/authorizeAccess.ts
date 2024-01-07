export const authorized = async (parent: any, args: any, context: any) => {
  if (context.user === "unauthorized") return false;
  else return true;
};
