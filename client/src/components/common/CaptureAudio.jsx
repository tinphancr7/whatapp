import React, {useEffect} from "react";
import {FaMicrophone, FaPauseCircle, FaPlay, FaTrash} from "react-icons/fa";
import {MdSend} from "react-icons/md";

function CaptureAudio({hide}) {
	const [{userInfo, currentChatUser, socket}, dispatch] = useStateProvider();
	const [isRecording, setIsRecording] = useState(false);
	const [recordedAudio, setRecordedAudio] = useState(null);
	const [waveForm, setWaveForm] = useState(null);
	const [recordingDuration, setRecordingDuration] = useState(0);
	const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
	const [totalDuration, setTotalDuration] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const audioRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	const waveFormRef = useRef(null);

	useEffect(() => {
		const waveSurfer = WaveSurfer.create({
			container: waveFormRef.current,
			waveColor: "#ccc",
			progressColor: "#4a9eff",
			cursorColor: "#7ae3c3",
			barWidth: 2,
			barRadius: 3,
			responsive: true,
			height: 40,
			barGap: 3,
			barMinHeight: 0.5,
		});
		setWaveForm(waveSurfer);
		waveSurfer.on("finish", () => {
			setIsPlaying(false);
		});
		return () => {
			waveSurfer.destroy();
		};
	}, []);
	useEffect(() => {
		if (waveForm) {
			handleStartRecording();
		}
	}, [waveForm]);
	const handlePlayRecording = () => {};
	const handlePauseRecording = () => {};
	const handleStartRecording = () => {
		setRecordingDuration(0);
		setIsRecording(true);
		setCurrentPlaybackTime(0);
		setTotalDuration(0);
		setIsRecording(true);
		navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			mediaRecorder.start();
			mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
			mediaRecorder.addEventListener("stop", handleStop);
			const audio = audioRef.current;
			audio.srcObject = stream;
			audio.play();
		});
	};
	const handleStopRecording = () => {};
	const sendRecording = () => {};

	const formatTime = (time) => {
		if (!time) return "00:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return ` ${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};
	return (
		<div className="flex text-2xl w-full items-center justify-end">
			<div className="pt-1">
				<FaTrash className="text-panel-header-icon" onClick={() => hide()} />
			</div>
			<div className="mx-4 py-2 text-white text-lg flex gap-3 items-center justify-center bg-search-input-container-background rounded-full ">
				{isRecording ? (
					<div className="text-red-500 animate-pulse text-center">
						Recording <span>{recordingDuration}s</span>
					</div>
				) : (
					<div>
						{recordedAudio && (
							<>
								{isPlaying ? (
									<FaPlay onClick={handlePlayRecording} />
								) : (
									<FaStop onClick={handlePauseRecording} />
								)}
							</>
						)}
					</div>
				)}
				<div className="w-60" ref={waveFormRef} hidden={isRecording}>
					{recordedAudio && isPlaying && (
						<span>{formatTime(currentPlaybackTime)}</span>
					)}
					{recordedAudio && isPlaying && (
						<span>{formatTime(totalDuration)}</span>
					)}
					<audio ref={audioRef} hidden />
					<div className="mr-4">
						{!isRecording ? (
							<FaMicrophone
								className="text-red-500"
								onClick={handleStartRecording}
							/>
						) : (
							<FaPauseCircle
								className="text-red-500"
								onClick={handleStopRecording}
							/>
						)}
					</div>
					<div>
						<MdSend
							className="text-panel-header-icon cursor-pointer mr-4"
							onClick={sendRecording}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CaptureAudio;
