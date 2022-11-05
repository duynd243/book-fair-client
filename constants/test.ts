export interface Type1 {
    id: number;
    name: string;
    displayName: string;
}
const x = {
    id: 1,
    name: 'name',
    displayName: 'displayName',
    extraKey: 'extraValue',
};

const y: Type1 = x;

console.log(Object.keys(y));

function getCampaignStatusById(id: string) {
    console.log(id[0]);
}
