import Image from 'next/image';
import React from 'react';

type Props = {
    avatars: {
        src: string;
        title?: string;
    }[];
    max?: number;
};

const AvatarGroup: React.FC<Props> = ({ avatars, max = 3 }) => {
    const [showAll, setShowAll] = React.useState(() => {
        return avatars.length <= max || avatars.length - 1 === max;
    });

    return (
        <div className="tw-flex tw-items-center -tw-space-x-2">
            {avatars
                .slice(0, showAll ? avatars.length : max)
                .map((avatar, index) => (
                    <Image
                        title={avatar.title}
                        key={index}
                        width={40}
                        height={40}
                        className="tw-w-7 tw-h-7 tw-shadow-sm tw-drop-shadow-sm tw-rounded-full tw-object-cover"
                        src={avatar.src}
                        alt={avatar.title || ''}
                    />
                ))}
            {!showAll && (
                <div className="tw-flex tw-items-center tw-justify-center tw-w-7 tw-h-7 tw-rounded-full tw-bg-gray-200 tw-border-white tw-text-gray-500">
                    +{avatars.length - max}
                </div>
            )}
        </div>
    );
};

export default AvatarGroup;
