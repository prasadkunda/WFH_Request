import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedUiDesignSystemModule } from '../../../utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';

@Component({
  selector: 'app-header-table',
  standalone: true,
  imports: [SharedUiDesignSystemModule],
  templateUrl: './header-table.component.html',
  styleUrl: './header-table.component.scss'
})
export class HeaderTableComponent {
  @Input() title: string = '';
  @Output() exportClicked = new EventEmitter<void>();
  @Output() searchChanged = new EventEmitter();

  onExportClick() {
    this.exportClicked.emit();
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchChanged.emit(input.value);
  }
}
