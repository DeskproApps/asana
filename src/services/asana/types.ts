export type AsanaAPIError = {
  error: {
    code: number,
    message: string,
  }
};

export type Photo = {
  image_21x21: string,
  image_27x27: string,
  image_36x36: string,
  image_60x60: string,
  image_128x128: string,
  image_1024x1024: string,
};

export type Me = {
  gid: string,
  email: string,
  name: string,
  photo: Photo,
  workspaces: Array<{ gid: string, resource_type: "workspace" }>
};
