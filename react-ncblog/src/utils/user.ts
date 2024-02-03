

export const getRole = (roles: string[]) => {
  const isAdmin = roles.includes('Admin' || 'admin')
  const isEditor = roles.includes('Editor' || 'editor')
  const isRegular = roles.includes('Regular' || 'regular')
  let status = "";

  if (isRegular) status = "Regular"
  if (isEditor) status = "Editor"
  if (isAdmin) status = "Admin"

  return status
}
