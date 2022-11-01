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
    const [showAll, setShowAll] = React.useState(false);

    React.useEffect(() => {
        setShowAll(avatars.length <= max || avatars.length - 1 === max);
    }, [avatars, max]);

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
                        className="tw-h-7 tw-w-7 tw-rounded-full tw-border tw-border-slate-50 tw-object-cover tw-shadow-sm tw-drop-shadow-sm"
                        src={avatar.src}
                        alt={avatar.title || ''}
                    />
                ))}
            {!showAll && (
                <div className="tw-flex tw-h-7 tw-w-7 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-slate-50 tw-bg-slate-200 tw-text-xs tw-font-medium tw-text-gray-500">
                    +{avatars.length - max}
                </div>
            )}
        </div>
    );
};

export default AvatarGroup;
