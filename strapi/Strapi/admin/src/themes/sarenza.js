const SarenzaColor = {
    main: '#eb0082',
    rd: '#FF5780',
    darken_rd:'#41000f',
    dark_rd:"#7d001e",
    label: '#5b626f',
    button: "#eb0082"
    // label: "#00FF00"
};

const sarenzaColors = {
    apply: (colors) => {

        const result = { ...colors };

        /*default vars*/
        result.logo.bgColor = "#007eff";

        result.logo.bgColor = SarenzaColor.rd;
        // result.strapi['blue-darker'] = SarenzaColor.darken_rd;
        // result.leftMenu['link-hover'] = SarenzaColor.dark_rd;
        // result.leftMenu['link-color'] = SarenzaColor.label;
        // result.leftMenu['title-color'] = SarenzaColor.main;
        // result["homePage"] = {};
        // result.homePage['link-color'] = SarenzaColor.rd;
        // result.homePage['link-color:hover'] = SarenzaColor.main;
        // result.mediumBlue = SarenzaColor.button;
        return result;
    }
};



export default sarenzaColors;