

export const getRole = (roles: string[]) => {
  const isSuperAdmin = roles.includes('superadmin');
  const isAdmin = roles.includes('admin');
  const isBlogAuthor = roles.includes('blogAuthor');
  const isUser = roles.includes('user');
  let status = "";

  if (isUser) status = "user"
  if (isBlogAuthor) status = "blogauthor"
  if (isAdmin) status = "admin"
  if (isSuperAdmin) status = "superadmin"

  return status
}
