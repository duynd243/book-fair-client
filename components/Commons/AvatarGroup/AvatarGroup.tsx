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
        <div className="flex items-center -space-x-2">
            {avatars
                .slice(0, showAll ? avatars.length : max)
                .map((avatar, index) => (
                    <Image
                        title={avatar.title}
                        key={index}
                        width={40}
                        height={40}
                        className="h-7 w-7 rounded-full border border-slate-50 object-cover shadow-sm drop-shadow-sm"
                        src={avatar.src}
                        alt={avatar.title || ''}
                    />
                ))}
            {!showAll && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-50 bg-slate-200 text-xs font-medium text-gray-500">
                    +{avatars.length - max}
                </div>
            )}
        </div>
    );
};

export default AvatarGroup;
