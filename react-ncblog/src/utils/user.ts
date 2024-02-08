

export const getRole = (roles: string[]) => {
  const isAdmin = roles.includes('Admin' || 'admin')
  const isWriter = roles.includes('Writer' || 'writer')
  const isRegular = roles.includes('Regular' || 'regular')
  let status = "";

  if (isRegular) status = "Regular"
  if (isWriter) status = "Writer"
  if (isAdmin) status = "Admin"

  return status
}
