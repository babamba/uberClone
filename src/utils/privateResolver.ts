// resolver 를 보호하는 resolver
const privateResolver = resolverFunction => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error("Not JWT . I refuse to proceed");
  }
  const resolve = await resolverFunction(parent, args, context, info);
  return resolve;
};

export default privateResolver;
