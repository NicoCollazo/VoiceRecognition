import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
  providers: [VoiceRecognitionService],
})
export class SpeechToTextComponent implements OnInit {
  isRecording: boolean = false;

  constructor(public service: VoiceRecognitionService) {
    this.service.init();
  }

  ngOnInit(): void {}

  startService() {
    this.service.start();
    this.isRecording = true;
  }

  stopService() {
    this.service.stop();
    this.isRecording = false;
  }
}
