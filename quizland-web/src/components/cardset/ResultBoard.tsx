import {FC, MouseEventHandler, useEffect} from "react";
import Modal from "@components/utility/Modal";
import {ArrowPathIcon, ArrowsRightLeftIcon, ArrowTrendingUpIcon} from "@heroicons/react/24/solid";
import {PieChart} from "react-minimal-pie-chart";
import styles from '@styles/ResultBoard.module.css'

const Button: FC<{ title: string, Icon?: any, onClick: MouseEventHandler }> = ({title, Icon, onClick}) => (
    <div
        onClick={onClick}
        className={'bg-secondary rounded-md text-lg p-4 pr-2 flex hover:scale-105 hover:text-white cursor-pointer duration-[250ms]'}>
        {Icon ? <Icon className={'w-7 mr-2'}/> : null}
        {/*@ts-ignore*/}
        <nobr>{title}</nobr>
    </div>
)
type Result = {title: string, value: number}
const ResultBoard: FC<{
    restart: MouseEventHandler, restartMissed: MouseEventHandler,
    success: Result, fail: Result, show: boolean
}> = ({restart, restartMissed, success, fail, show = true}) => {
    const data = [
        { color: '#c72e24', ...fail},
        {color: '#00a300', ...success},
    ]
    let percentage = (success.value / (success.value + fail.value) * 100)
    let tier = percentage > 100 ? 'A+' : percentage > 90 ? 'A' : percentage > 80 ? 'B' : percentage > 70 ? 'C' : percentage > 60 ? 'D' : 'F'
    let getText = () => {
        switch (tier) {
            case 'A+':
                return 'Perfect!';
            case 'A':
                return 'Lovely!';
            case 'B':
                return 'Good!';
            case 'C':
                return 'Still something to improve.';
            case 'D':
                return 'You can do better.';
            case 'F':
                return 'Try again.';
            default:
                return null;
        }
    }

    return <Modal isOpen={show}>
        <div className={'flex flex-col h-full p-6'}>
            <div className={'flex md:flex-row grow mt-4 lg:mt-8'}>
                <div
                    className={'flex mx-auto flex flex-col w-1/2 md:w-1/3 md:h-1/2 ml-6'}>
                    <div className={'relative mt-16 md:mt-0 md:mx-0 md:mr-auto w-full h-full'}>
                        <div className={'duration-200 ' + styles.ringAnimated}>
                            <PieChart
                                style={{ height: '80%', 'width': '100%', position: 'absolute', top: 0, left: 0}}
                                data={data}
                                lineWidth={30}
                                labelPosition={0}
                                label={({dataEntry}) => dataEntry.title == 'Known' ? `${percentage.toString().split('.')[0]}%` : null}
                                labelStyle={{fill: "whitesmoke"}}
                            />
                        </div>

                    </div>

                </div>
                <div className={'w-1/3 sm:w-1/5 flex md:mb-16'}>
                    <div className={'my-auto ml-8 text-xl md:text-lg'}>
                        {data.map((d: {title: string, color:string, value:number}, i) =>
                            <div key={i} className={'font-bold whitespace-nowrap'} style={{'color': d.color}}>{d.title}: {d.value}</div>)}
                    </div>
                </div>

                <div className={'hidden w-4/5 md:flex justify-center align-middle text-3xl text-center lg:text-4xl mb-16'}>

                        <div className={'my-auto'}>
                            {getText()}
                        </div>


                </div>
            </div>
            <div className={'w-full grid grid-cols-1 grid-rows-1 md:grid-cols-3 md:grid-flow-col gap-4'}>
                <Button title={'Restart'} Icon={ArrowPathIcon} onClick={restart}/>
                {fail.value === 0 ? <div/> : <Button title={'Only missed'} Icon={ArrowTrendingUpIcon}
                                                          onClick={restartMissed}/>}
                <Button title={'Switch mode'} Icon={ArrowsRightLeftIcon}
                        onClick={() => window.location.href = window.location.href.replace('/flashcard', '')}/>
            </div>
        </div>
    </Modal>
}

export default ResultBoard
