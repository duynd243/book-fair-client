import React, { useState } from 'react';
import ContentHeader from '../CampaignDetails/ContentHeader';
import { IoAdd } from 'react-icons/io5';
import ParticipationTable from './ParticipationTable';
import Separator from '../CampaignDetails/Seperator';
import { ICampaign } from '../../types/campaign/ICampaign';
import EmptySection from '../CampaignDetails/EmptySection';
import AddParticipationModal from './AddParticipationModal';

type Props = {
    campaign: ICampaign | undefined;
};

const ParticipationSection: React.FC<Props> = ({ campaign }) => {
    const [isAddModalShow, setIsAddModalShow] = useState<boolean>(false);

    return (
        <>
            <div>
                <div className="flex items-center justify-between">
                    <ContentHeader
                        text={`Nhà phát hành (${
                            campaign?.participations?.length || 0
                        })`}
                    />
                    <button
                        onClick={() => setIsAddModalShow(true)}
                        className="m-btn gap-1 bg-indigo-600 text-white hover:bg-indigo-500"
                    >
                        <IoAdd />
                        <span>Thêm NPH</span>
                    </button>
                </div>
                {campaign?.participations &&
                campaign?.participations?.length > 0 ? (
                    <ParticipationTable campaign={campaign} />
                ) : (
                    <EmptySection
                        text={'Sự kiện này chưa có nhà phát hành nào tham gia'}
                    />
                )}
            </div>
            <Separator />

            <AddParticipationModal
                campaign={campaign}
                isOpen={isAddModalShow}
                onClose={() => setIsAddModalShow(false)}
            />
        </>
    );
};

export default ParticipationSection;
