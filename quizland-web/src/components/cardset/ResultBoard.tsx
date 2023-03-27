import {MouseEventHandler} from "react";
import Modal from "@components/utility/Modal";
import {ArrowPathIcon, ArrowsRightLeftIcon, ArrowTrendingUpIcon} from "@heroicons/react/24/solid";
import {PieChart} from "react-minimal-pie-chart";


const Button = ({title, Icon, onClick}: { title: string, Icon?: any, onClick: MouseEventHandler }) => (
    <div
        onClick={onClick}
        className={'bg-secondary rounded-md text-lg p-4 pr-2 flex hover:scale-105 hover:text-white cursor-pointer duration-[250ms]'}>
        {Icon ? <Icon className={'w-7 mr-2'}/> : null}

        <nobr>{title}</nobr>
    </div>
)

const ResultBoard = ({restart, restartMissed, result, show = true, id}:
                         {
                             restart: MouseEventHandler, restartMissed: MouseEventHandler,
                             result: { learning: number, known: number }, show: boolean, id: string
                         }) => {
    const data = [
        {title: 'Learning', value: result.learning, color: '#a30000'},
        {title: 'Known', value: result.known, color: '#00a300'},

    ]
    let percentage = (result.known / (result.known + result.learning) * 100)
    let tier = percentage > 100 ? 'A+' : percentage > 90 ? 'A' : percentage > 80 ? 'B' : percentage > 70 ? 'C' : percentage > 60 ? 'D' : 'F'
    let getText = () => {
        console.log({tier})
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
            <div className={'flex grow mt-4 lg:mt-8'}>
                <div
                    className={'flex mx-auto md:absolute w-full h-2/3 flex flex-col md:flex-row md:h-2/5 lg:h-2/3 mt-28 md:mt-0'}>
                    <div className={'mx-auto md:mx-0 md:mr-auto w-2/3 md:w-1/3 h-full'}>
                        <PieChart
                            style={{marginTop: 'auto', marginBottom: '', height: '70%'}}
                            data={data}
                            lineWidth={30}
                            labelPosition={0}
                            label={({dataEntry}) => dataEntry.title == 'Known' ? `${percentage.toString().split('.')[0]}%` : null}
                            labelStyle={{fill: "whitesmoke"}}
                        />
                        <div className={'relative font-bold top-2 text-xl md:text-lg lg:text-lg text-center'}>
                            {
                                data.map((entry, i) =>
                                    (
                                        <div key={i} style={{color: entry.color}}>
                                            {entry.title}: {entry.value}
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>

                </div>

                <div className={'hidden md:block w-2/3 ml-auto flex justify-center'}>
                    <div className={'text-3xl text-center lg:text-4xl md:mt-8 lg:mt-16'}>
                        {getText()}
                    </div>


                </div>
            </div>
            <div className={'w-full grid grid-cols-1 grid-rows-1 md:grid-cols-3 md:grid-flow-col gap-4'}>
                <Button title={'Restart'} Icon={ArrowPathIcon} onClick={restart}/>
                {result.learning === 0 ? <div/> : <Button title={'Only missed'} Icon={ArrowTrendingUpIcon}
                                                          onClick={restartMissed}/>}
                <Button title={'Switch mode'} Icon={ArrowsRightLeftIcon}
                        onClick={() => window.location.href = window.location.href.replace('/flashcard', '')}/>
            </div>
        </div>
    </Modal>
}

export default ResultBoard