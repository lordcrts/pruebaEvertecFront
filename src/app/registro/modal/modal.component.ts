import { DataSource } from '@angular/cdk/table';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { merge, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { UserProfile } from 'src/app/@core/modelos/profile.model';
import { User } from 'src/app/@core/modelos/users.model';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  form: FormGroup;
  submit:boolean;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  photo:string;
  validatePhoto:boolean;
  user: User;
  profile: UserProfile;
  constructor(
              public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public element: any,
              private _service: RegistroService,
              private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,) { 
                this.form = this._formBuilder.group({
                  username: [null, [Validators.required, Validators.maxLength(10)]],
                  password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
                  first_name: [null, [Validators.required, Validators.maxLength(30)]],
                  last_name: [null, [Validators.required, Validators.maxLength(30)]],
                  marital_status: [null, [Validators.required]],
                  siblings: [null, [Validators.required]],
                  birthday: [null, [Validators.required]],
                  
                })
              }
  
  ngOnInit(): void {
    console.log(this.element)
    if(this.element.tipo === 'editar'){
      this.username.disable()
      this.password.disable()

      this.form.patchValue({
        first_name : this.element.element.first_name,
        last_name : this.element.element.last_name,
        marital_status : String(this.element.element.userprofile.marital_status),
        siblings : String(this.element.element.userprofile.siblings),
        birthday : this.element.element.userprofile.birthday,
      })

      this.toDataURL(this.element.element.userprofile.cover_photo, dataUrl =>{
        var base64= dataUrl.substr(dataUrl.indexOf(',')+1);
        this.photo = base64;
      })
    }
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get first_name(): AbstractControl {
    return this.form.get('first_name');
  }

  get last_name(): AbstractControl {
    return this.form.get('last_name');
  }

  get marital_status(): AbstractControl {
    return this.form.get('marital_status');
  }

  get siblings(): AbstractControl {
    return this.form.get('siblings');
  }

  get birthday(): AbstractControl {
    return this.form.get('birthday');
  }

  objToArray(obj: any): any[] {
    return obj !== null ? Object.keys(obj) : [];
  }

  userModel(user):User{
    if(this.element.tipo === 'crear'){
      user.setusername(this.username.value)
      user.setpassword(this.password.value)
    }
    
    user.setfirst_name(this.first_name.value)
    user.setlast_name(this.last_name.value)
    user.setuserprofile(this.profile)
    return user
  }

  userProfileModel(profile):UserProfile{
    profile.setmarital_status(this.marital_status.value)
    profile.setsiblings(this.siblings.value)
    let day = new Date(this.birthday.value).getDate() 
    let month = new Date(this.birthday.value).getMonth() +1
    let year = new Date(this.birthday.value).getFullYear() +1
    profile.setbirthday(year+ '-' + month + '-'+ day)
    profile.setcover_photo(this.photo.substr(this.photo.indexOf(',')+1))
    return profile
  }

  registerSubmit(){
    if(this.form.invalid || !this.photo){
      
    return
    }

    this.profile = new UserProfile()
    this.profile = this.userProfileModel(this.profile)
    this.user = new User()
    this.user = this.userModel(this.user)
    this._service.create(this.user).then(data => {
      this._snackBar.open('Usuario creado con exito.', 'Aceptar',{
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
    } )
    this.dialogRef.close(true)
    }).catch(error => {
      console.log(error)
    })

  }

  updateSubmit(){
    console.log('asd')
    if(this.form.invalid || !this.photo){
      
    return
    }

    this.profile = new UserProfile()
    this.profile = this.userProfileModel(this.profile)
    this.user = new User()
    this.user = this.userModel(this.user)
    this._service.update(this.user, this.element.element.id).then(data => {
      this._snackBar.open('Usuario actualizado con exito.', 'Aceptar',{
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
    } )
    this.dialogRef.close(true)
    }).catch(error => {
      console.log(error)
    })

  }

  delete(){
    this._service.delete(this.element.element.id).then(data => {
      this._snackBar.open('Usuario se ha eliminado con exito.', 'Aceptar',{
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
    } )
    this.dialogRef.close(true)
    }).catch(error => {
      console.log(error)
    })
  }

  fileChangeEvent(event: any): void {
    console.log(new Date(this.birthday.value).toLocaleDateString())
    if (event.target.files.length > 0 && event.target.files[0].size < 2000000){
      this.validatePhoto = true;
      this.imageChangedEvent = event;
      return
    }else{
      this._snackBar.open('La foto debe pesar menos de 2mb.', 'Aceptar',{
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
    } )
    this.validatePhoto = false;
    this.imageChangedEvent = null;
    return
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    if(this.validatePhoto){
      this.croppedImage = event.base64;
      this.photo = this.croppedImage
    }
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        console.log(xhr.response)
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

}