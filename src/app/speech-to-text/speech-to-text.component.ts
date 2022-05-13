import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
  providers: [VoiceRecognitionService],
})
export class SpeechToTextComponent implements OnInit {
  isRecording: boolean = false;
  startRecording: string = 'Iniciar';
  stopRecording: string = 'Detener';

  buttonText: string = this.startRecording;
  enableDarkMode: boolean = false;
  @Output() darkModeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public service: VoiceRecognitionService,
    private elementRef: ElementRef
  ) {
    this.service.init();
  }

  ngOnInit(): void {}

  startService() {
    this.service.start();
    this.isRecording = true;
    this.buttonText = this.stopRecording;
  }

  stopService() {
    this.service.stop();
    this.isRecording = false;
    this.buttonText = this.startRecording;
    this.checkForEffects();
  }

  callVoiceRecognitionService() {
    if (this.isRecording) {
      this.stopService();
    } else {
      this.startService();
    }
  }

  checkForEffects() {
    if (this.service.text.includes('que se haga de noche')) {
      this.enableDarkMode = true;
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
        '#121212';
      this.darkModeEvent.emit(this.enableDarkMode);
    }
  }
}
