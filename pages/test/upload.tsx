import { storage } from 'utils/firebase/initFirebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const UploadPage: NextPage = () => {
    const [file, setFile] = useState<File | null>(null);

    const mutation = useMutation(['upload'], async () => {
        if (file && file.type.startsWith('image/')) {
            // random string for file name
            const fileName =
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
            // get file extension
            const fileExtension = file.name.split('.').pop();
            const storageRef = ref(
                storage,
                `images/${fileName}.${fileExtension}`
            );
            const task = uploadBytesResumable(storageRef, file);
            task.on(
                'state_changed',
                (snapshot) => {},
                (err) => {
                    console.log(err);
                },
                () => {
                    getDownloadURL(task.snapshot.ref)
                        .then((url) => {
                            alert(url);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            );
        }
    });

    const handleUpload = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate();
    };

    const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && files.length > 0) {
            console.log(files[0].type);

            setFile(files[0]);
        }
    };
    return (
        <div>
            <h1>Upload Page</h1>
            <form onSubmit={(e) => handleUpload(e)}>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleFileChange}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadPage;
