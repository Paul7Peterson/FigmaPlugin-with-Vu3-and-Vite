export function getDocumentInfo () {
  return {
    id: figma.root.id,
    name: figma.root.name,
    parent: figma.root.parent,
    type: figma.root.type,
    removed: figma.root.removed,
    children: figma.root.children,
  };
}

export function getUser () {
  const user = figma.currentUser;
  if (!user) throw new Error('No user');
  return user;
}
