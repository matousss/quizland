import {ComponentProps, FC} from "react";


const CardsIcon: FC<ComponentProps<'svg'>> = (props) => (
    <svg fill="none" viewBox="0 0 196 196" strokeWidth="5.5" stroke="currentColor"
         xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="m 97.49881,24.054526 25.52573,106.594324 c 1.61527,6.7453 -3.3757,13.63401 -11.14736,15.38606 l -48.894131,11.02366 c -7.771427,1.75303 -15.382593,-2.29579 -16.997863,-9.04109 L 20.459456,41.423157 c -1.61527,-6.745295 3.376672,-13.63424 11.148332,-15.386293 L 80.501921,15.013205 c 7.771427,-1.753025 15.381621,2.296027 16.996889,9.041321 z"

        />
        <path
            d="M 173.70338,56.842302 143.52075,162.31464 c -1.91018,6.67507 -9.71152,10.48164 -17.4239,8.50345 L 77.576682,158.37176 C 69.8643,156.39357 65.160709,149.37879 67.070887,142.70373 L 97.25325,37.232351 c 1.91018,-6.675063 9.71055,-10.481911 17.42293,-8.503718 l 48.52017,12.446327 c 7.71238,1.978193 12.41694,8.993241 10.50703,15.667342"
            fill={'currentColor'}
        />
    </svg>
)

export default CardsIcon