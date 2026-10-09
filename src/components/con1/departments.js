const names = [
    '일반내과', '소화기내과', '혈액종양내과', '순환기내과', '내분비내과',
    '신장내과', '호흡기내과', '감염내과', '유방\n갑상선외과', '외과',
    '정형외과', '신경외과', '신경과', '재활의학과', '산부인과',
    '비뇨기과', '심장혈관\n흉부외과', '성형외과', '소아청소년과', '이비인후과',
    '정신\n건강의학과', '가정의학과', '영상의학과', '응급의학과', '진단\n검사의학과',
    '명리과', '마취\n통증의학과', '직업\n환경의학과', '중환자의학과', '치과\n(구강검진)',
    '의생명연구원', '건강증진센터',
];

export const departments = names.map((name, index) => ({
    id: index + 1,
    name,
    number: String(index + 1).padStart(2, '0'),
    icon: `/images/con1/department-${String(index + 1).padStart(2, '0')}.png`,
    hoverIcon: `/images/con1/department-${String(index + 1).padStart(2, '0')}-hover.png`,
}));
