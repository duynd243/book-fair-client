import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react';
import { storage } from './initFirebase';

const useFirebaseUpload = (file: File) => {
    const [progress, setProgress] = React.useState<number>(0);
    const [error, setError] = React.useState<any>();
    const [url, setUrl] = React.useState<string>('');

    React.useEffect(() => {
        const storageRef = ref(storage, `images/${file.name}`);
        const task = uploadBytesResumable(storageRef, file);

        task.on(
            'state_changed',
            (snapshot) => {
                let percentage =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);
            },
            (err) => {
                setError(err);
            },
            () => {
                getDownloadURL(task.snapshot.ref)
                    .then((url) => {
                        setUrl(url);
                    })
                    .catch((err) => {
                        setError(err);
                    });
            }
        );
    }, [file]);

    return { progress, url, error };
};

export default useFirebaseUpload;
