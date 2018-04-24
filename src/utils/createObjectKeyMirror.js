const createObjectKeyMirror = arr => arr.reduce((mirroredObject, token) => ({
    ...mirroredObject,
    [token]: `${token}`,
}), {});

export default createObjectKeyMirror;