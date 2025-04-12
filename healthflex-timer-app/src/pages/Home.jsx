import TimerList from '@/components/TimerList';
import TimerCreationForm from '@/components/TimerCreationForm';
import { useState } from 'react';
import '@/styles/pages/Home.css'

function Home({ addTimer, timers, updateTimer, completeTimer, setTimers }) {
    const [showCreationForm, setShowCreationForm] = useState(false);

    const handleTimerCreationForm = () => {
        setShowCreationForm(true);
    };

    return (
        <div>
            <button className="add-timer-button" onClick={handleTimerCreationForm}>
                + Add Timer
            </button>
            {showCreationForm && (
                <TimerCreationForm
                    addTimer={addTimer}
                    showCreationForm={showCreationForm}
                    onClose={() => setShowCreationForm(false)}
                />
            )}
            <TimerList
                timers={timers}
                updateTimer={updateTimer}
                completeTimer={completeTimer}
                setTimers={setTimers}
            />
        </div>
    );
}

export default Home;
