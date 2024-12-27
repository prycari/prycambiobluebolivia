import BolivianGiroIcon from 'src/assets/bolivianGiro.png'

export default function SitemarkIcon() {
    return (
        <div
            data-tip='BolivianGiro'
            className='tooltip tooltip-bottom hover:cursor-pointer'
        >
            <img src={BolivianGiroIcon} alt="Icon" className='size-8 mr-2' />
        </div>
    );
}
