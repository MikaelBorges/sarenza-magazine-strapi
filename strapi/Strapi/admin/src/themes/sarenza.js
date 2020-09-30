const SarenzaColor = {
    main: '#eb0082',
    rd: '#FF5780',
    label:'#5b626f'
};

const sarenzaColors = {
    apply: (colors) => {

        const result = { ...colors };
        result.logo.bgColor = SarenzaColor.rd;
        result.strapi['blue-darker'] = "#fff";
        result.leftMenu['link-hover'] = SarenzaColor.rd;
        result.leftMenu['link-color'] = SarenzaColor.label;
        result.leftMenu['title-color'] = SarenzaColor.main;
        return result;
    }
};



export default sarenzaColors;