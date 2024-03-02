export const errorResponseHandler = (res: any, error: any) => {
    return res.status(500).json(error);
}