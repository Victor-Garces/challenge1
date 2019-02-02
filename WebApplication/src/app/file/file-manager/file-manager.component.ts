import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastNotificationService, ToastType } from 'src/app/services/toast-notification.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  files: any[] = [
    {
      name: 'Victor',
      creatorUser: 'La Garza',
      creationDate: '2018-02-04',
      lastUpdate: '2018-03-04'
    }
  ];
  isVisible = false;
  fileForm: FormGroup;
  modalTitle = 'Creacion de archivo';
  isCreationMode = false;
  selectedFile = '';

  constructor(private fb: FormBuilder,
    private fileService: FileService,
    private toastNotificationService: ToastNotificationService) { }

  ngOnInit() {
    this.fileForm = this.fb.group({
      name: ['', Validators.required],
      firstMessage: ['', Validators.required],
      userOwner: ['', Validators.required],
      fileType: ['', Validators.required]
    });
  }

  showModalAsCreationMode(): void {
    this.isVisible = true;
    this.isCreationMode = true;
  }

  showModalAsEditMode(file: string): void {
    this.selectedFile = file;
    this.isVisible = true;
    this.isCreationMode = false;
  }

  handleOk(): void {
    if (!this.fileForm.valid) {
      this.displayToast('Error', 'Se necesita llenar todos los campos', ToastType.Error);
    } else {
      if (this.isCreationMode) {
        const fileForm = this.fileForm.getRawValue();
        this.createFile(fileForm);
        this.isVisible = false;
        this.fileForm.reset();
      } else {
        // const file = this.files.find(x => x.name == this.selectedFile);
        // console.log(this.files)
        // this.fileForm.setValue({
        //   name: file.name,
        //   firstMessage: file.firstMessage,
        //   userOwner: file.userOwner,
        //   fileType: file.fileType
        // });
      }
    }
  }

  private createFile(fileForm: any) {
    console.log(fileForm);
    this.fileService.createFile(fileForm).then(() => {
      this.displayToast('Archivo creado', '', ToastType.Success);
    }).catch(() => {
      this.displayToast('Error', 'No se logro crear el archivo', ToastType.Error);
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  displayToast(title: string, message: string, toastType: ToastType): void {
    this.toastNotificationService.show({
      title: title,
      message: message
    }, toastType);
  }

}