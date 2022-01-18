const Config = () => {
  return {
    google: {
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID as string
    },
    drf: {
      clientId: process.env.REACT_APP_DRF_CLIENT_ID as string,
      clientSecret: process.env.REACT_APP_DRF_CLIENT_SECRET as string
    },
    api: {
      host: process.env.REACT_APP_API_HOST as string
    }
  }
}
export const restfulApiConfig = Config();
export default restfulApiConfig;